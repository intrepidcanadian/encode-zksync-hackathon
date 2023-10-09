import React, { useState } from "react";

function SignVC() {

    const [signedVc, setSignedVC] = useState(null);

    const signButtonClick = async(e) => {

        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/sign-vcdata',{
                method: 'GET',
            }
            
            )

            const jwtstring = await response.text();

            setSignedVC(jwtstring);

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
     
      <button onClick={signButtonClick}>Sign Verifiable Credentials With Wallet Signature</button>

      {signedVc && <pre style = {contentStyle}>{JSON.stringify(signedVc, null, 2)}</pre>}
    </div>
  );
}

export default SignVC;