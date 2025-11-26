import { AuthTitle } from '@/features/auth/components/auth-title';
import { LoginForm } from '@/features/auth/components/form/login-form';
import { Spacer } from '@/features/shared/components/spacer';
import {
  ResponsiveWrapper,
  Wrapper,
} from '@/features/shared/components/ui/wrapper';

const Login = () => {
  return (
    <Wrapper>
      <ResponsiveWrapper>
        <Spacer size={80} />
        <AuthTitle
          title={'Sign in to Parent’s App'}
          subTitle={'Login to the parent app and get access to your account'}
        />

        <LoginForm />
      </ResponsiveWrapper>
    </Wrapper>
  );
};
export default Login;
