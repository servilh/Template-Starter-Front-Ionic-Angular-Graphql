import { Injectable } from '@angular/core'; 
import { ApolloQueryResult } from '@apollo/client/core/types';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Game from '../../../../common/src/models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesGqlService {
  private apollo: ApolloBase;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('newClientName');
  }

  getItems(): Observable<ApolloQueryResult<Array<Game>>> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          getGames{
              _id,
              name,
              category,
              price
          }
        }
      `,
    }).valueChanges.pipe(map((result) => {
      result.data = result.data?.getGames
      return result; 
    }));
  }
}
