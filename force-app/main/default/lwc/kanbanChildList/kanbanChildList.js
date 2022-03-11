import { LightningElement,api,wire } from 'lwc';

export default class KanbanChildList extends LightningElement {

    @api records 
    @api stage 

    handleDrag(evt) {
        const event = new CustomEvent('listitemdrag', {
            detail : evt.detail
        })
        this.dispatchEvent(event)
    }

    handleDrop() {
         const event = new CustomEvent('itemdrop', {
            detail : this.stage
        })
        this.dispatchEvent(event)
    }

    handleDragOver(event) {
        event.preventDefault()
    }
}