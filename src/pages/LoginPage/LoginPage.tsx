import heroBg from '@shared/assets/images/herobg.jpg';
import { LoginForm } from '@widgets/LoginForm';

export default function LoginPage() {
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
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-10">Вход</h1>
        <LoginForm />
      </div>
    </div>
  );
}
