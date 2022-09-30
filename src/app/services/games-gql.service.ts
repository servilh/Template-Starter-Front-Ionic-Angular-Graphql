import { Injectable } from '@angular/core'; 
import { ApolloQueryResult } from '@apollo/client/core/types';
import { Apollo, ApolloBase, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Game from '../../../../common/src/models/game';



@Injectable({
  providedIn: 'root'
})
export class GamesGqlService {
  private apollo: ApolloBase;
  public gamesCache: Array<Game>;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('newClientName');
  }

  GetItems(): Observable<ApolloQueryResult<Array<Game>>> {
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
    }).valueChanges.pipe( map((result) => {
      result.data = result.data?.getGames
      return result; 
    }), tap((result) => this.gamesCache =  result.data));
  }

  GetItem(id:string): Observable<ApolloQueryResult<Game>> {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          getGame(id: $id){
              _id,
              name,
              category,
              price
          }
        }
      `,
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache'
    }).valueChanges.pipe( map((result) => {
      result.data = result.data?.getGames
      return result; 
    }),tap((result) => this.gamesCache =  result.data));
  }
  
  Upsert(game: Game): Observable<MutationResult<any>> {
    const MUTATION_UPSERT = gql`mutation upsertGame($game: GameInput!) {
      upsertGame(game: $game)
    }`;

    return this.apollo.mutate({
      mutation: MUTATION_UPSERT,
      variables: {
        game:  {
          id: game._id,
          name: game.name,
          category: game.category,
          price: Number(game.price)
      }
      }
    }).pipe(map((result) => {
      result.data = result.data;
      return result; 
    }));
  }

  Delete(id: string): Observable<MutationResult<any>> {
    const MUTATION_UPSERT = gql`mutation deleteGame($id: String!) {
      deleteGame(id: $id)
    }`;

    return this.apollo.mutate({
      mutation: MUTATION_UPSERT,
      variables: {
        id:  id 
      }
    }).pipe(map((result) => {
      result.data = result.data;
      return result; 
    }));
  }
  
}
