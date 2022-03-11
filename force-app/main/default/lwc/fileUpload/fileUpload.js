import { LightningElement, wire, api, track } from 'lwc';
import fileDownloader from '@salesforce/apex/fileDownloader.getRelatedFilesByRecordId'
import { NavigationMixin } from 'lightning/navigation';

export default class FileUpload extends NavigationMixin( LightningElement) {
    @track error;
    @api recordId;
    filesList = []

    @wire(fileDownloader, { recordId: '$recordId' })
    wiredResults({ data, error }) {
        if (data) {
            console.log(data);
            this.filesList = Object.keys(data).map(item => ({
                'label': data[item],
                'value': item,
                'Url':`/sfc/servlet.shepherd/document/download/${item}`
            }))
            console.log(this.filesList)             
        } 
        if (error) {
            console.log(error);
        }
    }

    previewHandler(event) {
        console.log(event.target.dataset.id);
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName :'filePreview'
            },
            state: {
                selectedRecordId : event.target.dataset.id
            }
        })
    }
}