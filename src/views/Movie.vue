<template>
    <div class="container my-4 text-white">
        <div v-if="loading" class="text-center mb-4">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else>
            <h1>Detalhes do Filme</h1>

            <div v-if="movie" class="row mt-4">
                <div class="col-md-4">
                    <img :src="movie.poster_path" alt="Poster" class="img-fluid rounded shadow" />
                </div>
                <div class="col-md-8">
                    <h2>{{ movie.title }}</h2>
                    <p><strong>Data de Lançamento:</strong> {{ movie.release_date }}</p>
                    <p>{{ movie.overview }}</p>
                </div>
            </div>

            <div v-else>
                <div class="alert alert-danger" role="alert">
                    Filme não encontrado.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/axios'

export default {
    name: 'Movie',
    props: ['id'],
    data() {
        return {
            movie: null,
            loading: false,
            error: null
        }
    },
    methods: {
        async fetchData() {
            this.loading = true
            this.error = null
            try {
                const response = await api.get(`/movies/${this.id}`)
                this.movie = response.data
            } catch (err) {
                this.error = err.message || 'Erro ao carregar filme'
            } finally {
                this.loading = false
            }
        }
    },
    created() {
        this.fetchData()
    }
}
</script>
