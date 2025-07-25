<template>
	<div class="container my-4">
		<h1 class="text-white">Resultados para: {{ query }}</h1>
		<span>Total de itens encontrados: {{ this.total }}</span>

		<div v-if="loadingPage" class="text-center text-white">
			<div class="spinner-border text-light" role="status"></div>
			<p class="mt-2">Carregando resultados...</p>
		</div>

		<div v-else class="row my-4">
			<div v-for="movie in results" :key="movie.id" class="col-6 col-sm-4 col-md-3 col-lg-3 mb-3">
				<div class="card bg-dark text-white h-100">
					<img :src="movie.poster_path" class="card-img-top" alt="Poster"
						style="height: 250px; object-fit: cover" />
					<div class="card-body d-flex flex-column justify-content-between">
						<h6 class="card-title">{{ movie.title }}</h6>
						<button class="btn btn-sm mt-2" :class="{
							'btn-danger': movie.favorited,
							'btn-outline-danger': !movie.favorited,
						}" @click="toggleFavorite(movie)" :disabled="loadingFavorites[movie.id]">
							<span v-if="loadingFavorites[movie.id]" class="spinner-border spinner-border-sm me-1"
								role="status"></span>
							<i :class="movie.favorited ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
						</button>
					</div>
				</div>
			</div>
		</div>

		<nav v-if="lastPage > 1" aria-label="Paginação de resultados" class="mt-4">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{ disabled: currentPage === 1 }">
					<a class="page-link" :class="{ disabled: currentPage === 1 }" href="#"
						@click.prevent="currentPage > 1 && goToPage(currentPage - 1)"
						:aria-disabled="currentPage === 1 ? 'true' : 'false'" :tabindex="currentPage === 1 ? -1 : 0">
						Anterior
					</a>
				</li>

				<li v-for="page in paginationPages" :key="page" class="page-item"
					:class="{ active: page === currentPage }">
					<a class="page-link" :class="{ disabled: page === currentPage }" href="#"
						@click.prevent="page !== currentPage && goToPage(page)"
						:aria-current="page === currentPage ? 'page' : null" :tabindex="page === currentPage ? -1 : 0">
						{{ page }}
					</a>
				</li>

				<li class="page-item" :class="{ disabled: currentPage === lastPage }">
					<a class="page-link" :class="{ disabled: currentPage === lastPage }" href="#"
						@click.prevent="currentPage < lastPage && goToPage(currentPage + 1)"
						:aria-disabled="currentPage === lastPage ? 'true' : 'false'"
						:tabindex="currentPage === lastPage ? -1 : 0">
						Próxima
					</a>
				</li>
			</ul>
		</nav>

	</div>
</template>

<script>
import api from '@/axios';

export default {
	name: 'Search',
	data() {
		return {
			query: '',
			results: [],
			currentPage: 1,
			lastPage: 1,
			total: 0,
			loadingPage: false,
			loadingFavorites: {},
		};
	},
	mounted() {
		this.query = this.$route.query.q || '';
		this.searchMovies();
	},
	watch: {
		'$route.query.q'(newQ) {
			this.query = newQ;
			this.searchMovies();
		},
	},
	methods: {
		async searchMovies(page = 1) {
			if (!this.query) return;
			this.loadingPage = true;
			try {
				const response = await api.get('/movies/search', {
					params: { query: this.query, page },
				});
				this.results = response.data.movies;
				this.currentPage = response.data.current_page;
				this.lastPage = response.data.last_page;
				this.total = response.data.total;
			} catch (error) {
				console.error('Erro ao buscar filmes:', error);
			} finally {
				this.loadingPage = false;
			}
		},

		async toggleFavorite(movie) {
			const id = movie.id;
			this.loadingFavorites[id] = true;

			try {
				if (movie.favorited) {
					await api.delete(`/favorites/${id}`);
				} else {
					await api.post(`/movies/${id}`);
				}

				await this.searchMovies();

			} catch (error) {
				console.error('Erro ao alternar favorito:', error);
			} finally {
				this.loadingFavorites[id] = false;
			}
		},

		goToPage(page) {
			if (page < 1 || page > this.lastPage || page === this.currentPage) return;
			this.searchMovies(page);
		}

	},
	computed: {
		paginationPages() {
			const pages = [];
			let start = Math.max(this.currentPage - 2, 1);
			let end = Math.min(start + 4, this.lastPage);

			if (end - start < 4) {
				start = Math.max(end - 4, 1);
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			return pages;
		},
	},
};
</script>

<style scoped>
.page-item.active .page-link {
	background-color: #782dc8 !important;
	border-color: #782dc8 !important;
	color: white !important;
	cursor: default !important;
	pointer-events: none !important;
	user-select: none !important;
}
</style>
