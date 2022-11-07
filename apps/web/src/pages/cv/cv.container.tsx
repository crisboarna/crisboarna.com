import CV from './cv.ui';
import { useCallback } from 'react';
import { CV_URL } from '../../constants';

const CV_NAME = 'Cristian Boarna CV.pdf';

const CvContainer = () => {
  const onDownload = useCallback(async () => {
    const pdfBlob = await fetch(`${CV_URL}/${CV_NAME}`).then((res) =>
      res.blob()
    );
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([pdfBlob]));
    link.download = CV_NAME;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }, []);

  return <CV onDownload={onDownload} />;
};

export default CvContainer;
