
CREATE OR REPLACE FUNCTION public.create_user_with_profile(
  email text,
  password text,
  bio text,
  display_name text
)
RETURNS uuid AS $$
DECLARE
  user_id uuid;
  encrypted_pw text;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf', 12));

  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
     raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
     confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated',
     email, encrypted_pw, now(),
     '{"provider":"email","providers":["email"]}', '{}', now(), now(),
     '', '', '', '');

  INSERT INTO auth.identities
    (id, user_id, provider_id, identity_data, provider, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id, user_id,
     format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb,
     'email', now(), now());

  INSERT INTO public.user_profiles (id, email, bio, display_name)
  VALUES (user_id, email, bio, display_name);

  RETURN user_id;
END;
$$ LANGUAGE plpgsql;

SELECT create_user_with_profile('nahuel@test.com', '123456', 'Fan de los relojes clasicos', 'Nahuel');
SELECT create_user_with_profile('flor@test.com', '123456', 'Coleccionista de relojes', 'Flor');
