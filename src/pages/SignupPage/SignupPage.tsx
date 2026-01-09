import heroBg from '@shared/assets/images/herobg.jpg';
import { SignupForm } from '@widgets/SignupForm';

export default function SignupPage() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Контент поверх изображения */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <SignupForm />
      </div>
    </div>
  );
}
