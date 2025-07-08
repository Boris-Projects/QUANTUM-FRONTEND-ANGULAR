import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
import { MATERIAL_MODULES } from '@ui-core';
// import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
	selector: 'shell-host-login-page',
	standalone: true,
	imports: [
		CommonModule
		,FormsModule
		,ReactiveFormsModule
		,...MATERIAL_MODULES
		// ,MatButtonModule
	],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
	formLogin: FormGroup;
	isAnimated = false;
	// appearance: MatFormFieldAppearance = 'standard';

	constructor(
		private fb: FormBuilder
	) {
		this.formLogin = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit() {
		if (this.formLogin.valid) {
			console.log('Login info:', this.formLogin.value);
		}
	}

	onStartClick() {
		this.isAnimated = true;
	}
}
