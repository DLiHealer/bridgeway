import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-brand-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Strona nie znaleziona</h1>
      <p className="mt-2 text-neutral-400">Sprawdź adres lub wróć na stronę główną.</p>
      <Link to="/" className="mt-6"><Button>Wróć na stronę główną</Button></Link>
    </div>
  );
}