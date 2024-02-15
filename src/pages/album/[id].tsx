import { useRouter } from 'next/router';
import Album from '../../components/Album';

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Album id={id} />;
};

export default AlbumPage;