import React from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";


const url = 'https://ik.imagekit.io/znmlisjqg'
const publicKey = 'public_3k9QZVT3SzEtfCEY8p7Gk2rzSGE='

interface AuthResponse {
  signature: string;
  expire: number;
  token: string;
}

const authenticator = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err: any) => console.log(err);

interface ImagekitProps {
  id: string;
  multiple?: boolean;
  onSuccess: (res: any) => void;
}

const Imagekit: React.FC<ImagekitProps> = ({ id, multiple, onSuccess }) => {
  return (
    <div className="hidden cursor-pointer">
      <ImageKitProvider
        urlEndpoint={url}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          onError={onError}
          onSuccess={onSuccess}
          id={id}
          multiple={multiple || false}
        />
      </ImageKitProvider>
    </div>
  );
};

export default Imagekit;
