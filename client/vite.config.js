import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // localhost certificates
  
  // server: {
  //   https: {
  //     key: fs.readFileSync('/mnt/c/Users/jake/key.pem'), 
  //     cert: fs.readFileSync('/mnt/c/Users/jake/cert.pem'),
  //   },
  // },
  
  plugins: 
    [react({
        include: "**/*.jsx",
    })]    
})