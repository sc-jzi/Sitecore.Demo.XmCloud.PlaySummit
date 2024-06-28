import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ComponentParams,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { sessionDataResponse, getVariant } from 'src/utility/CDPPersonalizeService';
import { engage } from './PageViewCdp';

interface MyComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const RelatedSessions = (props: MyComponentProps): JSX.Element => {
  const {
    sitecoreContext: { pageState },
  } = useSitecoreContext();

  const [sessions, setSessions] = useState<sessionDataResponse>();
  const [engageLoaded, setEngageLoaded] = useState<boolean>(false);
  const [responseReady, setResponseReady] = useState(false);
  const friendlyId = 'jzisymposium';

  useEffect(() => {
    const engageLoadededInterval = setInterval(() => {
      if (
        engage //&& 
      //  pageState === 'normal'
      ) {

        setEngageLoaded(true);
        clearInterval(engageLoadededInterval);
      }
    }, 100);
    return () => {
      clearInterval(engageLoadededInterval);
    };
  }, [pageState]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log ("gonna try running fetchdata");
        const response = await getVariant(friendlyId);
        console.log("setting sessions");
        setSessions(response);
 
        console.log("response: " + sessions.sessions.data.sessions.results.length);
console.log("setting response ready to true")
        setResponseReady(true);
      } catch (error) {
        console.log("Zomg, errors");
      }
    }

    if (
      engageLoaded// && 
      //pageState === 'normal'
      ) {
      fetchData();
    }
  }, [engageLoaded, friendlyId, pageState]);

  useEffect(() => {
    const someInterval = setInterval(() => {
      if (
        engage && 
        responseReady
      ) {
        
        clearInterval(someInterval);

        return (
          <div className="w-full">
            <h2 className="font-bold text-5xl w-1/3 text-blue-light" style={{ margin: '0 auto' }}>Personalized Sessions</h2>
      
            <div className="columns-3 text-center w-1/2" style={{ margin: '0 auto' }}>
              {sessions.sessions.data.sessions.results.map((item, index) => (
                <div className="session" key={index}>
                  <Link href={item.url.path}>
                    <h2>{item.pageTitle.value}</h2>
                    <img src={item.image.jsonValue.value.src} alt={item.image.jsonValue.value.alt} />
                    <div dangerouslySetInnerHTML={{ __html: item.description.value }} className="truncate"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="w-full">
            <h2 className="font-bold text-5xl w-1/3 text-blue-light" style={{ margin: '0 auto' }}>Personalized Sessions</h2>
    
            <div className="columns-3 text-center w-1/2" style={{ margin: '0 auto' }}>
              <div className="session">
                <Link href="#">
                  <h2>Session Title</h2>
                  <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
                  <p className="truncate">Session Description</p>
                </Link>
              </div>
              <div className="session">
                <Link href="#">
                  <h2>Session Title</h2>
                  <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
                  <p className="truncate">Session Description</p>
                </Link>
              </div>
              <div className="session">
                <Link href="#">
                  <h2>Session Title</h2>
                  <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
                  <p className="truncate">Session Description</p>
                </Link>
              </div>
            </div>
          </div>
        );
      }
    }, 100);
    return () => {
      clearInterval(someInterval);
    };
  }, [sessions]);

  console.log("is response ready? " + responseReady);
  console.log("pageState? " + pageState);
  console.log("engage loadeed? " + engageLoaded);









  // useEffect(() => {
  //   const engageLoadededInterval = setInterval(() => {
  //     if (
  //       responseReady //&& 
  //     //  pageState === 'normal'
  //     ) {
  //       return (
          // <div className="w-full">
          //   <h2 className="font-bold text-5xl w-1/3 text-blue-light" style={{ margin: '0 auto' }}>Personalized Sessions</h2>
      
          //   <div className="columns-3 text-center w-1/2" style={{ margin: '0 auto' }}>
          //     {sessions.sessions.data.sessions.results.map((item, index) => (
          //       <div className="session" key={index}>
          //         <Link href={item.url.path}>
          //           <h2>{item.pageTitle.value}</h2>
          //           <img src={item.image.jsonValue.value.src} alt={item.image.jsonValue.value.alt} />
          //           <div dangerouslySetInnerHTML={{ __html: item.description.value }} className="truncate"></div>
          //         </Link>
          //       </div>
          //     ))}
          //   </div>
          // </div>
  //       );
  //     }
  //     else {
  //       return (
          // <div className="w-full">
          //   <h2 className="font-bold text-5xl w-1/3 text-blue-light" style={{ margin: '0 auto' }}>Personalized Sessions</h2>
    
          //   <div className="columns-3 text-center w-1/2" style={{ margin: '0 auto' }}>
          //     <div className="session">
          //       <Link href="#">
          //         <h2>Session Title</h2>
          //         <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
          //         <p className="truncate">Session Description</p>
          //       </Link>
          //     </div>
          //     <div className="session">
          //       <Link href="#">
          //         <h2>Session Title</h2>
          //         <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
          //         <p className="truncate">Session Description</p>
          //       </Link>
          //     </div>
          //     <div className="session">
          //       <Link href="#">
          //         <h2>Session Title</h2>
          //         <img className="mx-auto" src="-/media/Project/PLAY/playwebsite/media/img/speaker-john-doe" alt="Image Placeholder" />
          //         <p className="truncate">Session Description</p>
          //       </Link>
          //     </div>
          //   </div>
          // </div>
  //       );
  //     }
  //   }, 100);
  // }, [responseReady]);
  
  // if (
  //   (
  //   //  pageState === 'normal' && 
  //     responseReady
  //   )
  // ) {
    
  // } else {
    
  // }
  return (
    <div>uh oh</div>
  )
}

export const Default = RelatedSessions;