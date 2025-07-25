<template>
    <div class="container my-4">
        <h2 class="text-white mb-4">Meus Gêneros</h2>
        <div class="row">
            <div v-for="genre in genres" :key="genre.id" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
                <div class="card bg-dark text-white text-center" style="height: 100px; cursor: pointer;">
                    <div class="card-body d-flex align-items-center justify-content-center p-2">
                        <h6 class="mb-0">{{ genre.name }}</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/axios'

export default {
    name: 'Genres',
    data() {
        return {
            genres: []
        };
    },
    mounted() {
        this.fetchGenres();
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
    }
};
</script>
