import { gql } from "apollo-server-micro";

export const SIGN_IN = gql`
	mutation Signin($data: SigninParams) {
		signin(data: $data) {
			code
			success
			message
			token
			account {
				account_id
				email
			}
		}
	}
`;

export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($data: UpdateAccountParams!) {
		updateAccount(data: $data) {
			code
			success
			message
			profile {
				first_name
				last_name
				age
				description
				age
				gender
				job
				address {
					country
					state
					city
				}
			}
		}
	}
`;
export const DELETE_POST = gql`
	mutation DeletePost($postId: String!) {
		deletePost(postId: $postId) {
			id
		}
	}
`;
export const LIKE_POST = gql`
	mutation LikePost($postId: String!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				createdAt
				account {
					account_id
					profile {
						first_name
						last_name
						profile_image_url
					}
				}
			}
		}
	}
`;

export const CREATE_POST = gql`
	mutation CreatePost($body: String!) {
		createPost(body: $body) {
			code
			success
			message
			post {
				id
				body
				createdAt
				accountId
				account {
					profile {
						first_name
						last_name
						profile_image_url
					}
				}
				comments {
					id
				}
				likes {
					id
				}
			}
		}
	}
`;
export const GET_ACCOUNT = gql`
	query Account($accountId: String!) {
		account(account_id: $accountId) {
			code
			success
			message
			account {
				account_id
				email
				created_at
				posts {
					id
					body
					accountId
					createdAt
					account {
						profile {
							first_name
							last_name
							profile_image_url
						}
					}
					comments {
						createdAt
						body
						account {
							profile {
								first_name
								last_name
								profile_image_url
							}
						}
					}
					likes {
						id
						createdAt
						account {
							account_id
							email
							profile {
								first_name
								last_name
								profile_image_url
							}
						}
					}
				}
				profile {
					first_name
					last_name
					age
					gender
					description
					job
					profile_image_url
					address {
						country
						state
						city
					}
				}
			}
		}
	}
`;

// data for posts
export const GET_PPOSTS = gql`
	query Account($accountId: String!) {
		account(account_id: $accountId) {
			code
			success
			message
			account {
				posts {
					id
					body
					createdAt
					account {
						profile {
							first_name
							last_name
							profile_image_url
						}
					}
					comments {
						createdAt
						body
						account {
							profile {
								first_name
								last_name
								profile_image_url
							}
						}
					}
					likes {
						createdAt
						account {
							account_id
							email
							profile {
								first_name
								last_name
								profile_image_url
							}
						}
					}
				}
			}
		}
	}
`;
