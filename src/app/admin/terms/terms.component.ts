import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from 'angularfire2/firestore';
import { TermsService } from '../../shared/services';
import { Term } from '../../shared/models';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
	selector: 'bingo-terms',
	templateUrl: './terms.component.html',
	styleUrls: ['./terms.component.less'],
})
export class TermsComponent implements OnInit {
	terms: MatTableDataSource<Term> = new MatTableDataSource();
	@ViewChild('paginator') paginator;
	@ViewChild('addPanel') addPanel: MatExpansionPanel;

	constructor(private svc: TermsService) { }

	ngOnInit() {
		this.svc.getTerms().subscribe(terms => {
			this.terms = new MatTableDataSource(terms);
			this.terms.paginator = this.paginator;
		});
	}

	createTerm(text: string) {
		const term = { text: text, id: null };
		this.svc.saveTerm(term).subscribe(res => this.addPanel.close());
	}

	saveTerm(termId: string, newText: string) {
		const term = { id: termId, text: newText };
		this.svc.saveTerm(term);
	}

	deleteTerm(termId: string) {
		this.svc.deleteTerm(termId);
	}
}
