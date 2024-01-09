<template>    
        <div class="card flex justify-content-center">
            <!-- <InputText class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selectedItem" placeholder="Pesquisar..."/> -->
            <Button icon="pi pi-user-plus" rounded aria-label="User" @click="visivel = true, novoItem = true" /> 
        </div>
        <div class="card flex align-items-center justify-content-center border-round m-2">
            <DataTable :value="filteredData">
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

        <Dialog v-model:visible="visivel" modal :header="novoItem ? 'Novo Usuário' : 'Editar Usuário'" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="formgrid grid">
                <div class="field col-12 md:col-12">
                    <label for="">Nome</label>
                    <InputText class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="editandoItem.nome" placeholder="Nome"></InputText>
                </div>
                <div class="field col">
                    <label for="">Email</label>
                    <InputText class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="editandoItem.email" placeholder="Email"></InputText>
                </div>
                <div class="field col">
                    <label for="">Telefone</label>
                    <InputMask class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="editandoItem.telefone" mask="99 99999-9999" placeholder="Telefone" />
                </div>
            </div>           
            <Button severity="danger" icon="pi pi-times" rounded @click="cancelarEdicao"></Button> &nbsp;
            <Button icon="pi pi-check" rounded @click="salvarItem"></Button>
        </Dialog>
   
        <Toast />
        <ConfirmDialog></ConfirmDialog>
    
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const visivel = ref(false);
const novoItem = ref(false);
const editandoItem = ref({ nome: "", email: "", telefone: "" });
const confirm = useConfirm();
const toast = useToast();
const selectedItem = ref('');
const itens = ref([]);

const filteredData = computed(() => {
    if (selectedItem.value) {
        itens.value = itens.value.filter((row) => {
            return Object.keys(row).some((key) => {
                return String(row[key]).indexOf(selectedItem.value) > -1
            });
        });
    }

    return itens.value;
});

const buscarDados = async () => {
    try {
        // const resp = await axios.get("https://localhost:7008/api/Agenda");
        // itens.value = resp.data;
        itens.value = [
            { id: "1", nome: "teste um", email: "testeum@teste.com", telefone: "00 12345-6789" },
            { id: "2", nome: "teste dois", email: "testedois@teste.com", telefone: "00 12345-6789" },
            { id: "3", nome: "teste tres", email: "testetres@teste.com", telefone: "00 12345-6789" },
        ]
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
    await confirm.require({
        message: 'Deseja excluir este usuário?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            axios.delete(`https://localhost:7008/api/Agenda/${item.data.id}`);
            toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Você aceitou a exclusão', life: 5000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejeitado', detail: 'Exclusão rejeitada', life: 5000 });
        }
    });
    
    await buscarDados();
};

const salvarItem = async () => {
    if (!editandoItem.value.email || !editandoItem.value.email) {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o usuário', life: 5000 });
        return cancelarEdicao();
    }

    if (novoItem.value) {
        await axios.post("https://localhost:7008/api/Agenda/", editandoItem.value);
    } else {
        await axios.put(`https://localhost:7008/api/Agenda/${editandoItem.value.id}`, editandoItem.value);
    }

    toast.add({ severity: 'success', summary: '', detail: 'Salvo com suceso!', life: 3000 });
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