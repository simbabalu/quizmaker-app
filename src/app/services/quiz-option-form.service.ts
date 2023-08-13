import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class QuizOptionFormService{
  public form = new FormGroup({
    category: new FormControl(null),
    difficulty: new FormControl(null),
  }, {
    updateOn: 'blur',
  });

  public readonly category: FormControl = this.form.get('category') as FormControl;
  public readonly difficulty: FormControl = this.form.get('difficulty') as FormControl;

}
