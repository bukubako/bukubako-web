import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/api/search.service';
import { BookDetails } from 'src/app/model/book-details';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  private bookDetails: BookDetails;

  /**
   * コンストラクタ
   * @param router ルーター
   * @param service 検索サービス
   */
  constructor(private router: ActivatedRoute, private service: SearchService) { }

  /**
   * 初期化
   */
  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      const detailUri = params.get('detailUri');
      this.service.searchDetailsBook(detailUri).subscribe(bookDetails => {
        this.bookDetails = bookDetails;
      });
    });
  }
}
