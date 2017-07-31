import Vue from 'vue';
import Component from 'vue-class-component';

// Components
import ListComponent from './../../components/list/list';

// Store
import * as ingredientStore from './../../store/ingredients';
import { IListable } from './../../store/shared/sharedState';
import { IIngredientInstance } from '../../store/ingredients/ingredientsState';

@Component({
  template: require('./selection.html'),
  components: {
    'fbcs-list': ListComponent
  }
})

export default class SelectionComponent extends Vue {

  get selectedIngredients(): Array<IListable> {
    return ingredientStore.readIngredients(this.$store).filter((_ing: IIngredientInstance): boolean => {
      return _ing.isSelected;
    }).sort((i1: IIngredientInstance, i2: IIngredientInstance): number => {
      return i2.ingredient.type - i1.ingredient.type;
    });
  }

  get price(): number {
    let p = 0;
    this.selectedIngredients.forEach((_ing: IIngredientInstance): void => {
      p += _ing.ingredient.priceInCAD;
    });
    return Number((p).toFixed(2));
  }
}
