
-- Fix overly permissive notifications INSERT policy
DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Authenticated can insert notifications" ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
