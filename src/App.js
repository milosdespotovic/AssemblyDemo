import { useState } from 'react';
import Audio from './audio/Audio';
import Display from './display/Display';
import Options from './options/Options';
import { menu as options } from './mocks/menu';
import ReactLoading from 'react-loading';

function App() {
  const ASSEMBLYAI_API_KEY = 'f9da26145e824c72bb62de98b26de5cd';

  //State
  const [transcriptText, setTranscriptText] = useState('');
  const [selection, setSelection] = useState(options.options[0]);
  const [isLoading, setIsLoading] = useState(false);

  const poweredByLink = (
    <div className="w-30 text-[10px] overflow-hidden whitespace-nowrap">
      <a className="inline-flex" href="https://www.assemblyai.com/">
        <span className="pr-2">Powered by </span>
        <img
          className="w-16"
          src="https://www.assemblyai.com/_next/static/media/default.9b5386f1.svg"
        ></img>
      </a>
    </div>
  );

  //Styles
  const reactLoadingContainer =
    'bg-primary-500 w-40 h-20 inline-flex p-2 mb-2 m-auto justify-center align-center rounded-xl bg-opacity-70 shadow-2xl';
  const h1 = 'text-4xl text-center py-2';
  const appContainer = 'flex flex-col justify-center align-center m-auto';
  const orderAgainButton =
    'p-2 mb-2 m-auto rounded text-gray-500 bg-gray-200 font-semibold text-xs md:text-sm w-max active:bg-gray-300 transition duration-300 ease max-h-[10vh]';
  const poweredByContainer =
    'pt-10 m-auto inline-flex justify-center align-center';

  return (
    <>
      <div className={appContainer}>
        <h1 className={h1}>Restaurants</h1>
        {!isLoading ? (
          <Options
            options={options}
            selection={selection}
            setSelection={setSelection}
            show={transcriptText.length > 0 ? false : true}
          />
        ) : (
          <div className={reactLoadingContainer}>
            <ReactLoading type={'spin'} color={'white'} />
          </div>
        )}
        {transcriptText.length > 0 ? (
          <>
            <Display
              transcriptText={transcriptText}
              selection={options[selection]}
            />
            <button
              className={orderAgainButton}
              onClick={() => setTranscriptText('')}
            >
              Order Again
            </button>
          </>
        ) : null}

        <Audio
          apiKey={process.env.ASSEMBLYAI_API_URL || ASSEMBLYAI_API_KEY}
          setTranscriptText={setTranscriptText}
          setIsLoading={setIsLoading}
        />
        <div className={poweredByContainer}>{poweredByLink}</div>
      </div>
    </>
  );
}

export default App;
