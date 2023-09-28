import { useSearchParams } from 'react-router-dom';

export const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  return (
    <div className="error-page">
      <h1 className="center-text disable-selection">
        ERROR 404:
        <br /> {page ? `'${page}' ` : ''}
        page does not exist.
      </h1>
    </div>
  );
};
