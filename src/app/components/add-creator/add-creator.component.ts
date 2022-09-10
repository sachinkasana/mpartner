import { ThrowStmt } from '@angular/compiler';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { CommonService } from 'src/app/core/services/common.service';
import * as htmlToImage from 'html-to-image';
declare let html2canvas: any;

@Component({
  selector: 'app-add-creator',
  templateUrl: './add-creator.component.html',
  styleUrls: ['./add-creator.component.css'],
})
export class AddCreatorComponent implements OnInit {
  @ViewChild('inpt') inpt: ElementRef;
  fontSize = '14';
  // color: ThemePalette = 'primary';
  // mode: ProgressBarMode = 'determinate';
  value = 50;

  addColorList = [
    '#555555',
    '#ffffff',
    '#50e3c2',
    '#ffa700',
    '#0058cd',
    '#ff3f3f',
    '#bd10e0',
    '#4a90e2',
    '#ffb4b4',
    '#b8e986',
    '#f8e71c',
  ];

  colorPalette = false;
  // color: ThemePalette = 'primary';
  // mode: ProgressBarMode = 'determinate';
  // value=50;
  fontColor = '';
  languageList: any;
  imageList: any;
  showEditAdPopup = false;
  editFileUrl: string;
  @ViewChild('myOverlay', { static: false }) myOverlay: ElementRef;
  constructor(
    private commonService: CommonService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.commonService.getLanguages().subscribe((response) => {
      this.languageList = response && response.LanguageList;
    });
  }

  ngAfterViewInit() {
    var postIt: any = document.getElementsByClassName(
        'post-it'
      ) as HTMLCollectionOf<HTMLElement>,
      addTextToNote = function (this: any) {
        //"this" is the textarea because the function is bound to the textarea;
        var note = this.parentNode,
          postIt = note.parentNode;
        note.removeChild(this);
        note.innerText = this.value;
        note.style.position = 'absolute';
        note.style.top = '50%';
        note.width = '100%';

        postIt.onclick = addTextArea;
      },
      addTextArea = () => {
        //"this" is the div with class "post-it" because the function is bound to it;
        var note = document.getElementsByClassName(
            'note'
          ) as HTMLCollectionOf<HTMLElement>,
          t: any,
          i = 0;
        note[0].style.width = '100%';
        note[0].style.background = 'red';

        console.log(note);
        for (i = 0; i < note.length; i += 1) {
          t = <HTMLElement>document.createElement('input');
          t.rows = 10; // 10 rows and 25 columns is about
          t.cols = 25; // the correct size for the image
          t.style.position = 'absolute';
          t.style.top = '50%';
          t.style.background = 'red';
          t.style.outline = 'none';
          t.style.border = 'none';
          t.style.width = '100%';
          t.style.color = this.fontColor;
          t.value = note[i].innerText; // add any existing text
          t.onblur = addTextToNote;
          note[i].appendChild(t); // add textarea to note
          //this.onclick = null; // remove click handler to prevent multiple click problems
          t!.focus(); // give focus to the textarea
        }
      },
      i = 0;
    for (i = 0; i < postIt.length; i += 1) {
      console.log('postIt', postIt[0]);
      postIt[i].onclick = addTextArea;
    }
  }

  public switchLang(lang: any) {
    console.log('lang', lang);
    this.getImageList(lang);
  }

  getImageList(selectedLang: any) {
    this.commonService.getAdImageList(selectedLang).subscribe((res) => {
      console.log('res', res);
      if (res.Status == '200') {
        this.imageList = res.custom_image;
      } else {
        alert(res.Message);
      }
    });
  }

  editAdPopup(selectedFile: string) {
    this.editFileUrl = selectedFile;
    this.showEditAdPopup = true;
    this.changeDetectorRef.detectChanges();
    this.ngAfterViewInit();
    console.log('myOverlay', this.myOverlay);
  }

  closePopup() {
    this.showEditAdPopup = !this.showEditAdPopup;
  }

  openColor() {
    this.colorPalette = true;
  }

  selectColor(color: string) {
    this.fontColor = color;
  }

  save(fileName: string) {
    // First we get our section to save from dom
    let section = document.querySelector('#mainContainer');
    let urls =
      'https://media.wired.com/photos/5b899992404e112d2df1e94e/master/pass/trash2-01.jpg") no-repeat fixed center';
    // We pass that section to html2Canvase

    const options = {
      backgroundImage: `url(' + ${urls} + ')`,
    };
    html2canvas(section, options).then((canvas: any) => {
      var link = document.createElement('a');

      link.href = canvas.toDataURL();
      link.download = fileName;
      document.body.appendChild(link);

      link.click();
    });
  }

  downloadImage() {
    var node: any = document.getElementById('mainContainer');
    console.log('donwload img called', node);
    htmlToImage
      .toPng(node)
      .then(function (dataUrl:any) {
        var img = new Image();
        img.src = dataUrl;
        //document.body.appendChild(img);
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = dataUrl;
        link.click();
        //link.delete;
      })
      .catch(function (error:any) {
        console.error('oops, something went wrong!', error);
      });
  }
}
