import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LockKeyhole, LoaderCircle, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toApiError } from '@/api/apiError';
import { env } from '@/lib/env';
import { login } from '../api/authApi';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { useAuthStore } from '../store/authStore';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'operator@hastane.local',
      password: env.useMockAuth ? 'Demo123!' : 'password',
    },
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      setSession(session);
      const state = location.state as { from?: string } | null;
      navigate(state?.from || env.defaultProtectedRoute, { replace: true });
    },
  });

  return (
    <form
      className="min-w-0 space-y-5"
      onSubmit={handleSubmit((values) => mutation.mutate(values))}
      noValidate
    >
      {mutation.isError && <Alert variant="error">{toApiError(mutation.error).message}</Alert>}
      <div>
        <Label htmlFor="email">E-posta</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-slate-400" size={17} aria-hidden="true" />
          <Input
            id="email"
            type="email"
            autoComplete="username"
            className="pl-9"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-rose-600">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Şifre</Label>
        <div className="relative">
          <LockKeyhole
            className="absolute left-3 top-3.5 text-slate-400"
            size={17}
            aria-hidden="true"
          />
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="pl-9"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p id="password-error" role="alert" className="mt-1 text-xs text-rose-600">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <LoaderCircle className="animate-spin" size={18} aria-hidden="true" /> Giriş yapılıyor
          </>
        ) : (
          'Güvenli giriş yap'
        )}
      </Button>
    </form>
  );
}
