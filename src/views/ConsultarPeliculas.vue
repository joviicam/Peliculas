<template>
    <div class="peliculas-container">
        <h3>Consultar Películas</h3>
        <div v-show="showElement" class="drop-zone" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
            <p>Suelta el formulario aqui para crear una nueva película</p>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="pelicula in peliculas" :key="pelicula.idMovie">
                <div class="card pelicula-card">
                    <img :src="'https://picsum.photos/200/300?random=' + pelicula.idMovie" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ pelicula.name }}</h5>
                        <p class="card-text">Director: {{ pelicula.director }}</p>
                        <p class="card-text">Género: {{ pelicula.genre.name }}</p>
                        <p class="card-text">Fecha de estreno:
                            {{ pelicula.releaseDate.split('T')[0]}}</p>
                        <p class="card-text">Duración: {{ pelicula.duration }} minutos</p>
                        <div class="d-flex justify-content-between">
                            <b-button @click="getPelicula(pelicula.idMovie)"
                                v-b-modal.modal-prevent-closing>Actualizar</b-button>
                            <b-button @click="deleteMovie(pelicula.idMovie)" type="button"
                                variant="danger">Eliminar</b-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="drag-el" draggable @dragstart="startDrag($event)">
                <div class="form-container">
                    <h4>Registrar película</h4>
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required"
                            :state="nameCreateState">
                            <b-form-input id="name-input" v-model="peliculaCreate.name" :state="nameCreateState"
                                required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Director" label-for="director-input"
                            invalid-feedback="Director is required" :state="directorCreateState">
                            <b-form-input id="director-input" v-model="peliculaCreate.director"
                                :state="directorCreateState" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Género" label-for="genre-input" invalid-feedback="Género is required"
                            :state="genreCreateState">
                            <b-form-select id="genre-input" v-model="peliculaCreate.genre" :state="genreCreateState"
                                required>
                                <option v-for="genre in genres" :key="genre.idGenre" :value="genre.idGenre">{{
                                    genre.name }}
                                </option>
                            </b-form-select>
                        </b-form-group>
                        <b-form-group label="Duración" label-for="duration-input"
                            invalid-feedback="Duración is required" :state="durationCreateState">
                            <b-form-input id="duration-input" v-model="peliculaCreate.duration"
                                :state="durationCreateState" required></b-form-input>
                        </b-form-group>
                        <b-form-group label="Fecha de estreno" label-for="fecha-input"
                            invalid-feedback="Date is required" :state="fechaCreateState">
                            <b-form-input id="fecha-input" v-model="peliculaCreate.fecha" :state="fechaCreateState"
                                type="date" required></b-form-input>
                        </b-form-group>
                    </form>
                </div>
            </div>
        </div>

        <b-modal id="modal-prevent-closing" ref="modal-prevent-closing" title="Actualizar película" @show="resetModal"
            @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required"
                    :state="nameUpdateState">
                    <b-form-input id="name-input" v-model="peliculaUpdateName" :state="nameUpdateState"
                        required></b-form-input>
                </b-form-group>
                <b-form-group label="Director" label-for="director-input" invalid-feedback="Director is required"
                    :state="directorUpdateState">
                    <b-form-input id="director-input" v-model="peliculaUpdateDirector" :state="directorUpdateState"
                        required></b-form-input>
                </b-form-group>
                <b-form-group label="Género" label-for="genre-input" invalid-feedback="Género is required"
                    :state="genreUpdateState">
                    <b-form-select id="genre-input" v-model="peliculaUpdateGenre" :state="genreUpdateState" required>
                        <option v-for="genre in genres" :key="genre.idGenre" :value="genre.idGenre">{{ genre.name }}
                        </option>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Duración" label-for="duration-input" invalid-feedback="Duración is required"
                    :state="durationUpdateState">
                    <b-form-input id="duration-input" v-model="peliculaUpdateDuration" :state="durationUpdateState"
                        required></b-form-input>
                </b-form-group>
                <b-form-group label="Fechade estreno" label-for="fecha-input" invalid-feedback="Date is required"
                    :state="fechaUpdateState">
                    <b-form-input id="fecha-input" v-model="peliculaUpdateFecha" :state="fechaUpdateState" type="date"
                        required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<style>
    .peliculas-container {
        padding-left: 20px;
        margin-top: 10px;
    }

    .pelicula-card {
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .card-img-top {
        height: 200px;
        object-fit: cover;
    }

    .card-body {
        padding: 15px;
    }

    .form-container {
        padding: 20px;
        background-color: rgb(93, 166, 226);
        width: 40%;
        height: auto;
        border-radius: 10px;
        box-shadow: 7px 7px 10px 0 rgba(0, 0, 0, 0.2);
    }

    .drop-zone {
        background-color: #eee;
        margin-bottom: 10px;
        padding: 10px;
    }

    .drag-el {
        background-color: #fff;
        margin-bottom: 10px;
        padding: 5px;
    }
</style>

<script>

    import movieService from '@/services/Movie'

    export default {
        data() {
            return {
                genres: [
                ],
                peliculas: [
                ],
                peliculaCreate: {
                    name: '',
                    director: '',
                    genre: '',
                    duration: '',
                    fecha: ''
                },
                nameCreateState: null,
                directorCreateState: null,
                genreCreateState: null,
                durationCreateState: null,
                fechaCreateState: null,
                peliculaUpdate: {
                    name: '',
                    director: '',
                    genre: '',
                    duration: '',
                    fecha: ''
                },
                nameUpdateState: null,
                directorUpdateState: null,
                genreUpdateState: null,
                durationUpdateState: null,
                fechaUpdateState: null,
                peliculaUpdateName: '',
                peliculaUpdateDirector: '',
                peliculaUpdateGenre: '',
                peliculaUpdateDuration: '',
                peliculaUpdateFecha: '',

                //scroll
                showElement: true,
                lastScrollPosition: 0
            }
        },
        mounted() {
            window.addEventListener("scroll", this.onScroll);
            this.getPeliculas();
            this.getGenres();
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.onScroll);
        },
        methods: {
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                return valid
            },
            resetModal() {
                    this.peliculaCreate = {
                        name: '',
                        director: '',
                        genre: '',
                        duration: '',
                        fecha: ''
                    }
                this.nameCreateState = null
                this.directorCreateState = null
                this.genreCreateState = null
                this.durationCreateState = null
                this.fechaCreateState = null
                this.peliculaUpdate = {
                    name: '',
                    director: '',
                    genre: '',
                    duration: '',
                    fecha: ''
                }
                this.nameUpdateState = null
                this.directorUpdateState = null
                this.genreUpdateState = null
                this.durationUpdateState = null
                this.fechaUpdateState = null
            },
            handleOk(bvModalEvent) {
                // Prevent modal from closing
                bvModalEvent.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            createMovie() {
                if (!this.checkFormValidity()) {
                    return
                }
                this.$nextTick(() => {
                    this.postPelicula()
                    this.$bvModal.hide('modal-create')
                    alert('Película creada correctamente')
                })
            },
            createMovieFromDrag() {
                console.log('Creando película')
                if (!this.checkFormValidity()) {
                    alert('Campos vacíos')
                    return
                }
                this.postPelicula()
                alert('Película creada correctamente')
                //Limpiar campos
                this.peliculaCreate.name = ''
                this.peliculaCreate.director = ''
                this.peliculaCreate.genre = ''
                this.peliculaCreate.duration = ''
                this.peliculaCreate.fecha = ''
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Push the name to submitted names
                this.submittedNames.push(this.name)
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
                this.putMovie()
            },
            async getPeliculas() {
                console.log('Obteniendo películas')
                try {
                    const response = await movieService.getMovies()
                    console.log(response.data)
                    this.peliculas = response.data
                } catch (error) {
                    console.error(error)
                }
            },
            async getPelicula(idMovie) {
                try {
                    console.log('Obteniendo película')
                    console.log(idMovie)
                    const response = await movieService.getMovie(idMovie)
                    console.log(response.data)
                    this.peliculaUpdate = response.data
                    this.peliculaUpdateName = response.data.name
                    this.peliculaUpdateDirector = response.data.director
                    this.peliculaUpdateGenre = response.data.genre.idGenre
                    this.peliculaUpdateDuration = response.data.duration
                    this.peliculaUpdateFecha = response.data.releaseDate ? response.data.releaseDate.split('T')[0] : ''
                } catch (error) {
                    console.error(error)
                }
            },
            async postPelicula() {
                try {
                    console.log('Creando película')
                    console.log(this.peliculaCreate)
                    const movie = {
                        name: this.peliculaCreate.name,
                        director: this.peliculaCreate.director,
                        genre: {
                            idGenre: this.peliculaCreate.genre
                        },
                        duration: this.peliculaCreate.duration,
                        releaseDate: this.peliculaCreate.fecha
                    }
                    const response = await movieService.postMovie(movie)
                    console.log(response.data)
                    this.getPeliculas()
                } catch (error) {
                    console.error(error)
                }
            },
            async deleteMovie(idMovie) {
                try {
                    console.log('Eliminando película')
                    console.log(idMovie)
                    const response = await movieService.deleteMovie(idMovie)
                    console.log(response.data)
                    alert('Película eliminada correctamente')
                    this.getPeliculas()
                } catch (error) {
                    console.error(error)
                }
            },
            async getGenres() {
                try {
                    console.log('Obteniendo géneros')
                    const response = await movieService.getGenres()
                    console.log(response.data)
                    this.genres = response.data
                } catch (error) {
                    console.error(error)
                }
            },
            async putMovie() {
                try {
                    let idMovie = this.peliculaUpdate.idMovie
                    console.log('Actualizando película')
                    console.log(this.peliculaUpdate)
                    const movie = {
                        name: this.peliculaUpdateName,
                        director: this.peliculaUpdateDirector,
                        genre: {
                            idGenre: this.peliculaUpdateGenre
                        },
                        duration: this.peliculaUpdateDuration,
                        releaseDate: this.peliculaUpdateFecha
                    }
                    const response = await movieService.putMovie(idMovie, movie)
                    console.log(response.data)
                    alert('Película actualizada correctamente')
                    this.getPeliculas()
                } catch (error) {
                    console.error(error)
                }
            },
            onDrop(event) {
                console.log('Soltado');
                console.log(event);
                this.createMovieFromDrag();

            },

            startDrag(event) {
                console.log('Drag started');
                console.log(event);
            },

            //scroll
            onScroll() {
                // Obtiene la posición actual del scroll
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                console.log(currentScrollPosition);

                // La función abs para tener valores absolutos y se delimita con un offset o bien llamado 
                // margen para que el valor de la posición sea después de desplazarce y no desde que uno se desplaza
                if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
                    return;
                }
                // aqui determinamos si la posición es mayor a la posición anterior. Entonces, si lo es, mostramos el elemento.
                this.showElement = currentScrollPosition < this.lastScrollPosition;
                //  
                this.lastScrollPosition = currentScrollPosition;
            },

        }
    }
</script>