import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button.tsx';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center p-3'>
      <Button className='bg-blue-500 text-white' onClick={() => navigate('/')}>
        На главную
      </Button>
    </div>
  );
};
