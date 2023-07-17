import axios from "axios";

// Retrieve the base URL and bearer token from environment variables
const baseURL = "https://vmi1015553.contaboserver.net:8090/";
const bearerToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY5MDExNDA0MH0.XuzVoPw1SFOu99k9AIIcBWiEcQC9HWLGaBlzTNlcXwUntq5HhXnYVlRpEBClhSOoxMixL-bHF-T0yoAex_j9vA";

// Create an axios instance with the baseURL and default headers
const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
    // You can add more default headers here if needed
  },
});

export default instance;
