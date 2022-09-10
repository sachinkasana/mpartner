import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { PopupComponent } from './popup/popup.component';
import { PdfViewerPopupComponent } from './pdf-viewer-popup/pdf-viewer-popup.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BarCodeScannerComponent } from './bar-code-scanner/bar-code-scanner.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { RouterModule } from '@angular/router';
import { BannerNavigateComponent } from '../e-warrenty/banner-navigate/banner-navigate.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ImagePopupComponent } from "./image-popup/image-popup.component";
import { DealerOptionsComponent } from '../e-warrenty/dealer-options/dealer-options.component';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { MobileValidatorDirective } from 'src/app/core/directives/mobile-validator.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DataTableComponent } from './data-table/data-table.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import{PopupConfirmationComponent,DialogAnimationsExampleDialog}from'./popup-confirmation/popup-confirmation.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdPopupComponent } from './ad-popup/ad-popup.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PdfViewerModule,
    //TranslateModule,
    TranslateModule.forChild(),
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ZXingScannerModule,
    BarcodeScannerLivestreamModule,
    YouTubePlayerModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatCheckboxModule,
    InfiniteScrollModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    SidenavMenuComponent,
    ScratchCardComponent,
    QrCodeScannerComponent,
    PopupComponent,
    PdfViewerPopupComponent,
    LoaderComponent,
    FooterComponent,
    CarouselComponent,
    BarCodeScannerComponent,
    BannerNavigateComponent,
    SearchBarComponent,
    ImagePopupComponent,
    DealerOptionsComponent,
    PdfPreviewComponent,
    MobileValidatorDirective,
    DataTableComponent,
    PopupConfirmationComponent,DialogAnimationsExampleDialog, AdPopupComponent
    ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PdfViewerModule,
    TranslateModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ZXingScannerModule,
    BarcodeScannerLivestreamModule,
    SidenavMenuComponent,
    ScratchCardComponent,
    QrCodeScannerComponent,
    PopupComponent,
    PdfViewerPopupComponent,
    LoaderComponent,
    FooterComponent,
    CarouselComponent,
    BarCodeScannerComponent,
    BannerNavigateComponent,
    YouTubePlayerModule,
    ShareButtonsModule,
    ShareIconsModule,
    SearchBarComponent,
    ImagePopupComponent,
    DealerOptionsComponent,
    PdfPreviewComponent,
    MatCheckboxModule,
    InfiniteScrollModule,
    DataTableComponent,
    MatProgressBarModule,
    MatDialogModule,
    PopupConfirmationComponent,DialogAnimationsExampleDialog,
    MatProgressSpinnerModule,
    AdPopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule {
}