import http from '../http-common';

class UploadFilesService {
  upload = (file, onUploadProgress) => {
    const formData = new FormData();

    formData.append('file', file);

    return http.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }

  // getFiles() {
  //   return http.get('/files');
  // }
   getFiles = () => {
     this.bar = http.get('/files');
     return this.bar;
   }
}

export default new UploadFilesService();
