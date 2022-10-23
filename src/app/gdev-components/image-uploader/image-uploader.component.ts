import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {imageElement} from './image-preview/image-preview.component';
import {MatDialog} from '@angular/material/dialog';
import {UploadingComponent, UploadingData} from './uploading-dialog/uploading-dialog.component';

@Component({
    selector: 'gdev-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements OnInit {

    @Input() displayAction: string = ''
    @Input() folder: string  = ''
    @Input() prefix: string = ''
    @Input() srcPreview?: imageElement = {} as imageElement
    @Input() srcGroup: imageElement[] = []
    @Input() multiple: boolean = false

    public image: any
    public multipleFiles: any[] = []

    @Output() result: EventEmitter<any> = new EventEmitter()
    @Output() itemDeleted: EventEmitter<string> = new EventEmitter()

    constructor (
        private _dialog: MatDialog,
        // private _alerta: AlertService
    ) {}

    ngOnInit(): void {
        if (!this.displayAction) this.displayAction = 'Cargar'
        if (!this.folder) console.error('Need add folder name')
    }

    onFileSelected(file: any): void {
        this.image = file.target.files[0]
    }

    onFilesSelected(files: any) {
        var list: FileList = files.target.files
        Object.keys(list).forEach((fileIndex: string | number) => {
            if (fileIndex != 'length') this.multipleFiles.push(list[fileIndex as number])
        })
        var data: UploadingData = {
            objects: list.length,
            files: this.multipleFiles,
            folder: this.folder
        }
        var dialog = this._dialog.open(UploadingComponent, {
            data: data,
            maxWidth: 250
        })

        dialog.afterClosed().subscribe(files => {
            this.srcGroup = [...this.srcGroup, ...files]
            this.result.emit(this.srcGroup)
        })
    }

    setResult(result: imageElement) {
        if (this.multiple) {
            this.srcGroup.push(result)
            this.result.emit(this.srcGroup)
        } else {
            this.srcPreview = result
            this.result.emit(this.srcPreview)
        }

    }

}

