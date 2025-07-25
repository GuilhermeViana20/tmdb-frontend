<template>
    <div class="container mb-5">
        <div v-if="loading" class="text-center mb-4">
            <div class="spinner-grow text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="text-center">
                <span>Por favor, aguarde...</span>
            </div>
        </div>

        <div v-else>
            <div v-if="movies.length === 0" class="text-center mb-4">
                <p class="text-light">Nenhum filme favorito encontrado. Deseja buscar por filmes?</p>

                <button @click="$emit('open-search-modal')" class="btn btn-secondary">
                    Buscar filmes <i class="bi bi-search ms-1"></i>
                </button>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-4">Filmes Favoritos</h2>

                <div class="mb-4">
                    <label class="text-light me-2">Filtrar por gênero:</label>
                    <select v-model="selectedGenre" @change="onGenreChange" class="form-select w-auto d-inline-block">
                        <option value="">Todos</option>
                        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                    </select>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                <div class="col" v-for="movie in movies" :key="movie.id">
                    <router-link :to="'/movie/' + movie.id" class="text-decoration-none text-reset">
                        <div class="movie-card bg-dark text-white rounded position-relative">
                            <button class="btn btn-link position-absolute top-0 end-0 p-2 text-danger"
                                @click.prevent="removeFavorite(movie.id)">
                                <i class="bi bi-heart-fill fs-5"></i>
                            </button>

                            <img :src="movie.poster_path" :alt="'Poster do filme: ' + movie.title" class="movie-poster">

                            <div class="movie-info">
                                <h3 class="movie-title text-light">{{ movie.title }}</h3>
                                <p class="movie-description truncate-one-line">{{ movie.overview.length > 100 ?
                                    movie.overview.slice(0, 100) + '...' : movie.overview }}</p>
                                <div class="movie-meta">
                                    <span>Estreia {{ movie.release_date }}</span>
                                </div>
                                <div class="mt-2">
                                    <span class="genre-badge" v-for="(genre, index) in movie.genres.slice(0, 2)"
                                        :key="genre">
                                        {{ genre.name }}
                                    </span>
                                    <span v-if="movie.genres.length > 2" class="genre-badge">
                                        +{{ movie.genres.length - 2 }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/axios'

export default {
    name: 'Home',
    data() {
        return {
            movies: [],
            genres: [],
            selectedGenre: this.$route.query.genre_id || '',
            loading: false,
        }
    },
    created() {
        this.fetchGenres()
        this.fetchMovies()
    },
    methods: {
        async fetchGenres() {
            try {
                const response = await api.get('/genres')
                this.genres = response.data
            } catch (err) {
                console.error('Erro ao buscar gêneros:', err)
            }
        },
        async fetchMovies() {
            this.loading = true;
            try {
                const response = await api.get('/movies', {
                    params: this.selectedGenre ? { genre_id: this.selectedGenre } : {}
                });
                this.movies = response.data;
            } finally {
                this.loading = false;
            }
        },
        onGenreChange() {
            this.$router.push({
                query: { ...this.$route.query, genre_id: this.selectedGenre || undefined }
            });
        },
        async removeFavorite(movieId) {
            if (!confirm('Tem certeza que deseja remover este filme dos favoritos?')) return;

            try {
                await api.delete(`/movies/${movieId}`);
                this.movies = this.movies.filter(movie => movie.id !== movieId);
            } catch (err) {
                console.error('Erro ao remover favorito:', err);
                alert('Erro ao remover favorito.');
            }
        }
    },
    watch: {
        '$route.query.genre_id'(newGenre) {
            this.selectedGenre = newGenre || '';
            this.fetchMovies();
        }
    },
}

</script>

<style scoped>
body {
    background-color: #141414;
    color: #fff;
}

.movie-card {
    overflow: hidden;
    transition: transform 0.3s ease;
}

.movie-card:hover {
    transform: scale(1.05);
    z-index: 1;
}

.movie-poster {
    height: 300px;
    object-fit: cover;
    width: 100%;
}

.movie-info {
    padding: 15px;
}

.movie-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.movie-description {
    font-size: 0.9rem;
    color: #aaa;
}

.movie-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
    color: #777;
}

.genre-badge {
    background-color: #782dc8;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    margin-right: 5px;
}

.header {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    padding: 20px 0;
    position: relative;
    z-index: 2;
}

.hero-section {
    position: relative;
    height: 60vh;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 100%);
    margin-bottom: 30px;
}

.hero-content {
    position: absolute;
    bottom: 20%;
    left: 5%;
    max-width: 50%;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.hero-button {
    background-color: #e50914;
    border: none;
    padding: 10px 20px;
    font-weight: bold;
}
</style>