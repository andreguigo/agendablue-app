<template>
    <div class="card flex justify-content-center">
        <Button icon="pi pi-user-plus" rounded aria-label="User" @click="visivel = true, novoItem = true" />
        <Dialog v-model:visible="visivel" modal header="Contato" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <h4>{{ novoItem ? 'Novo Usuário' : 'Editar Usuário' }}</h4>
            <InputText v-model="editandoItem.nome" placeholder="Nome"></InputText>
            <InputText v-model="editandoItem.email" placeholder="Email"></InputText>
            <InputText v-model="editandoItem.telefone" placeholder="Telefone"></InputText>
            <Button label="Salvar" icon="pi pi-check" rounded @click="salvarItem"></Button> &nbsp;
            <Button label="Cancelar" icon="pi pi-times" rounded @click="cancelarEdicao"></Button>
        </Dialog>
    </div>

    <div class="card flex justify-content-center">
        <DataTable :value="itens" size="small" tableStyle="min-width: 50rem">
            <Column field="nome" header="Nome"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="telefone" header="Telefone"></Column>
            <Column>
                <template #body="slotProps">
                    <Button icon="pi pi-user-edit" rounded @click="editarItem(slotProps)" size="small"></Button> &nbsp; 
                    <Button icon="pi pi-trash" rounded @click="excluirItem(slotProps)" size="small"></Button>
                </template>
            </Column>
        </DataTable>
    </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import Dialog from 'primevue/dialog';

const itens = ref([]);
const visivel = ref(false);
const novoItem = ref(false);
const editandoItem = ref({ nome: "", email: "", telefone: "" });

const buscarDados = async () => {
    try {
        const resp = await axios.get("https://localhost:7008/api/Agenda");
        itens.value = resp.data;
    } catch (err) {
        console.log("Erro ao buscar os dados da API:", err);
    }
};

const editarItem = (item) => {
    editandoItem.value = item.data;
    novoItem.value = false;
    visivel.value = true;
};

const excluirItem = async (item) => {
    const confirmarExclusao = window.confirm("Tem certeza que deseja excluir este item?");
    
    if (confirmarExclusao) {
        await axios.delete(`https://localhost:7008/api/Agenda/${item.data.id}`);
    }

    await buscarDados();
};

const salvarItem = async () => {
    if (novoItem.value) {
        await axios.post("https://localhost:7008/api/Agenda/", editandoItem.value);
    } else {
        await axios.put(`https://localhost:7008/api/Agenda/${editandoItem.value.id}`, editandoItem.value);
    }

    await buscarDados();

    visivel.value = false;
    novoItem.value = false;
    editandoItem.value = {};
};

const cancelarEdicao = () => {
    visivel.value = false;
    novoItem.value = false;
    editandoItem.value = {};
}

buscarDados();
</script>