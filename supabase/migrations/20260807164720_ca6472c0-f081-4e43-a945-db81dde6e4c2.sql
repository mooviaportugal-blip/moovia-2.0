DO $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Check if user already exists in auth.users
    SELECT id INTO new_user_id FROM auth.users WHERE email = 'admin@mooviaportugal.com';

    IF new_user_id IS NULL THEN
        -- Create the user in auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        )
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@mooviaportugal.com',
            crypt('@Moovia26', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{"full_name":"Admin MOOVIA"}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        )
        RETURNING id INTO new_user_id;
    ELSE
        -- Update password for existing user
        UPDATE auth.users 
        SET encrypted_password = crypt('@Moovia26', gen_salt('bf')),
            updated_at = now(),
            email_confirmed_at = COALESCE(email_confirmed_at, now())
        WHERE id = new_user_id;
    END IF;

    -- Ensure the user is in admin_users table
    INSERT INTO public.admin_users (id, role)
    VALUES (new_user_id, 'admin')
    ON CONFLICT (id) DO UPDATE SET role = 'admin';

END $$;
