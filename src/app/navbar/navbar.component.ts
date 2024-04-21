import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    router = inject(Router);
    searchTerm: string = '';


    onSearch(searchTerm: string) {
        this.searchTerm = searchTerm;

        if (searchTerm.length >= 1) {
            this.router.navigate(['search'], { queryParams: { q: searchTerm } });
        } else if (searchTerm.length === 0) {
            this.router.navigate(['']);
        }
    }
}
