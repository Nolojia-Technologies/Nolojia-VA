-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS(SELECT 1 FROM profiles WHERE id = user_id AND role = 'admin');
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to get unread message count
CREATE OR REPLACE FUNCTION public.get_unread_count(user_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM messages m
  JOIN conversation_participants cp ON m.conversation_id = cp.conversation_id
  WHERE cp.user_id = user_id
  AND m.sender_id != user_id
  AND m.read = false;
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to mark messages as read
CREATE OR REPLACE FUNCTION public.mark_messages_read(conversation_id UUID, user_id UUID)
RETURNS VOID AS $$
  UPDATE messages
  SET read = true
  WHERE conversation_id = mark_messages_read.conversation_id
  AND sender_id != user_id
  AND read = false;
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to get dashboard stats for clients
CREATE OR REPLACE FUNCTION public.get_client_dashboard_stats(user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  WITH client_data AS (
    SELECT id FROM clients WHERE clients.user_id = get_client_dashboard_stats.user_id
  )
  SELECT json_build_object(
    'total_tasks', (SELECT COUNT(*) FROM tasks WHERE client_id = (SELECT id FROM client_data)),
    'pending_tasks', (SELECT COUNT(*) FROM tasks WHERE client_id = (SELECT id FROM client_data) AND status = 'pending'),
    'in_progress_tasks', (SELECT COUNT(*) FROM tasks WHERE client_id = (SELECT id FROM client_data) AND status = 'in_progress'),
    'completed_tasks', (SELECT COUNT(*) FROM tasks WHERE client_id = (SELECT id FROM client_data) AND status = 'completed'),
    'total_files', (SELECT COUNT(*) FROM files WHERE client_id = (SELECT id FROM client_data)),
    'unpaid_invoices', (SELECT COUNT(*) FROM invoices WHERE client_id = (SELECT id FROM client_data) AND status != 'paid'),
    'unread_messages', (SELECT get_unread_count(get_client_dashboard_stats.user_id))
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get dashboard stats for admins
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_clients', (SELECT COUNT(*) FROM clients WHERE status = 'active'),
    'total_assistants', (SELECT COUNT(*) FROM assistants WHERE status != 'offline'),
    'total_tasks', (SELECT COUNT(*) FROM tasks),
    'pending_tasks', (SELECT COUNT(*) FROM tasks WHERE status = 'pending'),
    'active_conversations', (SELECT COUNT(DISTINCT conversation_id) FROM messages WHERE created_at > NOW() - INTERVAL '7 days'),
    'pending_bookings', (SELECT COUNT(*) FROM bookings WHERE status = 'pending'),
    'monthly_revenue', (SELECT COALESCE(SUM(amount), 0) FROM invoices WHERE status = 'paid' AND paid_at >= date_trunc('month', NOW()))
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
