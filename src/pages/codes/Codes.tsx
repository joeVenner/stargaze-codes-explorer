import "./Codes.css";

import React from "react";

import { ClientContext } from "../../contexts/ClientContext";
import {
  ErrorState,
  errorState,
  isErrorState,
  isLoadingState,
  LoadingState,
  loadingState,
} from "../../ui-utils/states";
import { Code, CodeData } from "./Code";

interface LoadedCode {
  readonly source: string;
  readonly data: CodeData;
}

function codeKey(code: LoadedCode): string {
  return `${code.source}__${code.data.codeId}`;
}

export function Codes(): JSX.Element {
  const { client, nodeUrl } = React.useContext(ClientContext);
  const [codes, setCodes] = React.useState<readonly LoadedCode[] | ErrorState | LoadingState>(loadingState);


  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const codeInfos = await client?.getCodes();
        if (!codeInfos) {
          return; // codeInfos is undefined, exit early
        }
        const processed = (await Promise.all(codeInfos.map(async (response) => {
          const contracts = await client?.getContracts(response.id);
          if (!contracts) {
            return; // codeInfos is undefined, exit early
          }
          const Fcontract = contracts.length > 0 ? contracts[0] : undefined;
          
          if (!Fcontract) {
            return; // codeInfos is undefined, exit early
          }

          const queryURL = `https://rest.stargaze-apis.com/cosmwasm/wasm/v1/contract/${Fcontract}/raw/Y29udHJhY3RfaW5mbw==`;
          const contractResponse = await fetch(queryURL);
          const contractData = await contractResponse.json();
          let C_version
          C_version = JSON.parse( "{ \"contract\":\"\", \"version\":\"\" }");
          
          try {
            C_version = JSON.parse(atob(contractData.data));
          } catch (error) {
            console.error(error);
          }
        
          return {
            source: nodeUrl,
            data: {
              codeId: response.id,
              checksum: response.checksum,
              creator: response.creator,
              contract: C_version.contract,
              version: C_version.version,
            },
          };
        }))).filter((item): item is LoadedCode => item !== undefined);
        
        const reversed = processed.reverse();
        // console.log(reversed);
        setCodes(reversed);
        
        
      } catch (error) {
        console.log(error);
        
        setCodes(errorState);
      }
    };
  
    fetchData();
  }, [client, nodeUrl]);
  
  
  
  // React.useEffect(() => {
    
   
    
  //   client
  //   ?.getCodes()
  //   .then((codeInfos) => {



  //       const processed = codeInfos
  //         .map(
  //           (response): LoadedCode => ({
  //             source: nodeUrl,
              


  //             data: {
  //               codeId: response.id,
  //               checksum: response.checksum,
  //               creator: response.creator,
                
                
  //             },
  //           }),
  //         )
  //         .reverse();
  //       setCodes(processed);
  //     })
  //     .catch(() => setCodes(errorState));
  // }, [client, nodeUrl]);

  // Display codes vertically on small devices and in a flex container on large and above
  // console.log(codes);
  return (

    <div className="d-lg-flex flex-wrap">
      {isLoadingState(codes) ? (
        <p>Loading …</p>
      ) : isErrorState(codes) ? (
        <p>Error loading codes</p>
      ) : codes.length === 0 ? (
        <p>No code uploaded yet</p>
      ) : (

        codes.map((code, index) => 
        {

        return <Code data={code.data} index={index} key={codeKey(code)} />
        }
        )
        )}
    </div>
  );
}

