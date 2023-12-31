import React, { useState } from "react";

function SignVP() {

    const [signedVP, setSignedVP] = useState(null);

    const signButtonClick = async(e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/sign-vpdata',{
                method: 'GET',
            }
            
            )

            const jwtstring = await response.text();

            setSignedVP(jwtstring);

        } catch(error) {
            console.log('Error signing VC:', error)
        }

    }


    const contentStyle = {
      maxHeight: '300px', 
      overflowY: 'auto',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap', 
      border: '1px solid #ccc',  
      padding: '10px'
    };


  return (
    <div>
     
      <button onClick={signButtonClick}>Sign Verifiable Presentation With Wallet Signature</button>

      {signedVP && <pre style = {contentStyle}>{JSON.stringify(signedVP, null, 2)}</pre>}
    </div>
  );
}

export default SignVP;