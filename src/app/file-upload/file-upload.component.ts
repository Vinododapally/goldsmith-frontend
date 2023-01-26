import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'file-upload-root',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})

export class FileUploadComponent {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8081/api/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

  viewImage() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    });
    this.httpClient.get('http://localhost:8081/api/get/image/info/' + this.image)
      .subscribe(
        res => {
          this.postResponse = res;
          //this.dbImage=this.postResponse.image;
          //alert(this.postResponse.image)
          var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(this.postResponse.image)));
          //this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          //console.log('image path with bytes=====>'+this.dbImage)
          // this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          //this.dbImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          //this.createImageFromBlob(this.postResponse);

          //let TYPED_ARRAY = new Uint8Array(this.postResponse.image);
          //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
          //let base64String = btoa(this.postResponse.image);
          //this.dbImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
          //var bytes = [this.postResponse.image]; // get from server
          //var uints = new Uint8Array(bytes);
         // var base64 = btoa(String.fromCharCode(null, uints));
          //this.dbImage = 'data:image/jpeg;base64,' + base64String;
          //console.log('hahhahhaahah not working====>'+this.dbImage);
          //this.dbImage = this.sanitizer.bypassSecurityTrustResourceUrl("data:Image/jpeg;base64," + this.postResponse.image);
         // this.dbImage = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.postResponse.image}`);
          //this.dbImage = 'data:image/jpeg;base64,'+this.postResponse.image;

         // let objectURL = URL.createObjectURL(this.postResponse.image);
          let objectURL = 'data:image/jpeg;base64,' + this.postResponse.image;
          this.dbImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          console.log(this.dbImage);
          
        }
      );
  }




  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load",
      () => {
          this.dbImage.photo = reader.result;
      },
      false);

    if (image) {
      if (image.type !== "application/pdf")
        reader.readAsDataURL(image);
    }
  }
}
