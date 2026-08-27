-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Clients can update their own data" ON clients
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Assistants policies
CREATE POLICY "Assistants can view their own data" ON assistants
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Assistants can update their own data" ON assistants
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage assistants" ON assistants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Tasks policies
CREATE POLICY "Clients can view their own tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clients WHERE id = tasks.client_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Assistants can view their assigned tasks" ON tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assistants WHERE id = tasks.assistant_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can create tasks" ON tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients WHERE id = tasks.client_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Assistants can update their assigned tasks" ON tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM assistants WHERE id = tasks.assistant_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all tasks" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Task activities policies
CREATE POLICY "Users can view activities for their tasks" ON task_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tasks t
      LEFT JOIN clients c ON t.client_id = c.id
      LEFT JOIN assistants a ON t.assistant_id = a.id
      WHERE t.id = task_activities.task_id
      AND (c.user_id = auth.uid() OR a.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can create task activities" ON task_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view their conversations" ON conversations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = conversations.id AND user_id = auth.uid()
    )
  );

-- Conversation participants policies
CREATE POLICY "Users can view participants in their conversations" ON conversation_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversation_participants cp
      WHERE cp.conversation_id = conversation_participants.conversation_id
      AND cp.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Users can view messages in their conversations" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their conversations" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (sender_id = auth.uid());

-- Files policies
CREATE POLICY "Users can view their own files" ON files
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Clients can view their client files" ON files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clients WHERE id = files.client_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload files" ON files
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own files" ON files
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all files" ON files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Invoices policies
CREATE POLICY "Clients can view their own invoices" ON invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clients WHERE id = invoices.client_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Payments policies
CREATE POLICY "Clients can view their payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invoices i
      JOIN clients c ON i.client_id = c.id
      WHERE i.id = payments.invoice_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments" ON payments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings policies (public can create, admins can manage)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update bookings" ON bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts policies (public read, admin write)
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all blog posts" ON blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog categories policies (public read, admin write)
CREATE POLICY "Anyone can view categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON blog_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog post categories policies
CREATE POLICY "Anyone can view post categories" ON blog_post_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage post categories" ON blog_post_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);
