/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      isbn
      title
      authors
      longLine
      thumbnail
      review
      publishedDate
      postedDate
      rating
      owner
      isPrivate
      user {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      like {
        id
        count
        createdAt
        updatedAt
      }
      comment {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $id: ID
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        isbn
        title
        authors
        longLine
        thumbnail
        review
        publishedDate
        postedDate
        rating
        owner
        isPrivate
        createdAt
        updatedAt
        user {
          userId
          age
          organization
          name
          profileImg
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      age
      organization
      name
      profileImg
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userId: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      count
      pressby {
        userId
        age
        organization
        name
        profileImg
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $id: ID
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLikes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      bookId
      post {
        id
        isbn
        title
        authors
        longLine
        thumbnail
        review
        publishedDate
        postedDate
        rating
        owner
        isPrivate
        createdAt
        updatedAt
      }
      comment
      commentby
      id
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments($filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        bookId
        comment
        commentby
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
