import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => (
  <div className='flex flex-row items-center gap-10'>
    <span className='text-3xl'>CARGANDO...</span>
    <ClipLoader size={70} />
  </div>
);

export default Loading;
