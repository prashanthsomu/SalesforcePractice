import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class KanbanChildCard extends NavigationMixin(LightningElement) {

    @api record;
    @api stage;

    get isSameStage() {
        return this.stage === this.record.StageName
    }

    NavigationHandler(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id,
                objectApiName: 'Opportunity',
            }
        });
    }

      NavigationHandlerAccount(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id,
                objectApiName: 'Account',
            }
        });
      }
    
    itemDragStart() {
        const event = new CustomEvent('itemdrag', {
            detail : this.record.Id
        })
        this.dispatchEvent(event)
    }
}