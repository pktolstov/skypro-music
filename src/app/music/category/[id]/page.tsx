'use client';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useParams } from 'next/navigation';
import { getTracksByIds } from '@/utils/helper';
import { useState, useEffect } from 'react';
import { getTracks, getTrackSet } from '@/services/tracksApi';
import { TrackType, TrackSetType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<TrackType[]>([]);
  const [trackSet, setTrackSet] = useState<TrackSetType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTracks = await getTracks();
        const trackSetResponse = await getTrackSet(params.id);

        console.log('trackSet:', trackSetResponse);

        const filtered = getTracksByIds(allTracks, trackSetResponse.items);

        setTracks(allTracks);
        setFilteredTracks(filtered);
        setTrackSet(trackSetResponse);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            setError(`Error, ${error.message}`);
            console.log('Error', error.message);
          }
        }
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <Centerblock
      data={filteredTracks}
      title={trackSet ? trackSet.name : ''}
    />
  );
}




























// 'use client';
// import Centerblock from '@/components/Centerblock/Centerblock';

// import { useParams } from 'next/navigation';
// import { getTracksByIds } from '@/utils/helper';
// import { useState } from 'react';
// import { getTracks, getTrackSet } from '@/services/tracksApi';
// import { TrackType,TrackSetType } from '@/sharedTypes/sharedTypes';
// import { useEffect } from 'react';
// import { AxiosError } from 'axios';

// export default function CategoryPage() {
//   const params = useParams<{ id: string }>();
//   const [tracks, setTracks] = useState<TrackType[]>([]);
//   const [tracksSetId, setTracksId] = useState<TrackSetType>();
//   const [error, setError] = useState('');
//   useEffect(() => {
//     getTracks()
//       .then((res) => {
//         getTrackSet(params.id)
//         .then((response) => {
          
//           console.log(response);
//           setTracksId(response.items)
//           console.log(tracksSetId);
          
//           // setTracks(getTracksByIds(tracks, tracksSetId))
  
//         })
//         setTracks(res);
//       })
//       .catch((error) => {
//         if (error instanceof AxiosError) {
//           if (error.response) {
//             setError(error.response.data);
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//           } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//             // http.ClientRequest in node.js
//             console.log(error.request);
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             setError(`Error, ${error.message}`);
//             console.log('Error', error.message);
//           }
//         }
//       });
//   }, []);
//   return <Centerblock data={tracks} title="Треки" />;
// }



