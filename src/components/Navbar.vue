<template>
    <div class="container" data-bs-theme="dark">
        <header class="border-bottom lh-1 py-3 mb-4">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-4">
                    <router-link class="link-secondary" to="/">
                        <img src="@/assets/logo.svg" alt="Logo" height="30" />
                    </router-link>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <button class="btn btn-secondary" @click="openSearchModal()" aria-label="Search">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </header>

        <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content bg-dark">
                    <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                        <div class="w-75">
                            <div class="justify-content-between d-flex mb-5 align-items-center">
                                <img src="@/assets/logo.svg" alt="Logo" height="25" />

                                <button @click="closeSearchModal()" type="button" class="btn btn-danger">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>

                            <input type="text" v-model="searchQuery" class="form-control form-control-lg mb-3"
                                placeholder="Buscar filmes..." autofocus />
                            <button @click="performSearch" class="btn btn-danger btn-lg w-100">Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref="toast" />
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Toast from '@/components/Toast.vue';

export default {
    name: 'Navbar',
    components: {
        Toast
    },
    data() {
        return {
            searchQuery: '',
            searchModal: null,
            toast: null
        };
    },
    mounted() {
        const modalEl = document.getElementById('searchModal');
        if (modalEl) {
            this.searchModal = new Modal(modalEl, {
                backdrop: true,
                keyboard: true
            });
        }

        this.toast = this.$refs.toast;
    },
    methods: {
        openSearchModal() {
            this.searchModal.show();
        },
        closeSearchModal() {
            this.searchModal.hide();
        },
        performSearch() {
            if (!this.searchQuery.trim()) {
                this.toast.show('Por favor, insira um termo de pesquisa.', 'danger');
                return;
            }
            this.searchModal.hide();
            this.$router.push({
                path: '/search',
                query: { q: this.searchQuery.trim() }
            });
            this.searchQuery = '';
        }
    }
};
</script>

<style scoped>
.position-absolute {
    z-index: 1000;
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
