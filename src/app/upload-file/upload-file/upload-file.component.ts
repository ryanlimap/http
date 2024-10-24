import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import { UploadFileService } from '../upload-file.service';
import { response } from 'express';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) { }

  ngOnInit() { }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    const fileLabel = document.getElementById('customFileLabel');
    if (fileLabel) {
      fileLabel.innerHTML = fileNames.join(', ');
    } else {
      console.error(`Elemento com ID customFileLabel não encontrado`);
    }

    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, '/api/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'));
    }
  }

  onDownloadPdf() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
  }
}