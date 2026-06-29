import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiService {
  private client: AxiosInstance;
  private token: string;
  private baseUrl: string;
  private baseId: string;
  private tableId: string;

  constructor() {
    this.token = import.meta.env.VITE_NOCODB_TOKEN || "";
    this.baseUrl = import.meta.env.VITE_NOCODB_URL || "";
    this.baseId = import.meta.env.VITE_NOCODB_BASE_ID || "";
    this.tableId = import.meta.env.VITE_NOCODB_TABLE_ID || "";

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        "xc-token": this.token,
      },
    });

    // Interceptor para manejar errores
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }

  // Buscar registro por auth0_sub usando API v3
  async findByAuth0Sub(auth0Sub: string, email?: string) {
    try {
      let whereClause = `(auth0_sub,eq,${auth0Sub})`;

      // Agregar validación por email si se proporciona
      if (email) {
        whereClause = `${whereClause}~and(email,eq,${email})`;
      }

      const response = await this.client.get(
        `/api/v3/data/${this.baseId}/${this.tableId}/records`,
        {
          params: {
            where: whereClause
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error finding record by auth0_sub ${auth0Sub}:`, error);
      throw error;
    }
  }

  // Enviar credenciales al API con parámetro where en query string
  async sendCredentials(email: string, password: string) {
    try {
      const whereClause = `(email,eq,${email})~and(contrasenia,eq,${password})`;
      const response = await this.client.get(
        `/api/v3/data/${this.baseId}/${this.tableId}/records`,
        {
          params: {
            where: whereClause
          }
        }
      );

      // Verificar si la respuesta está vacía
      if (!response.data.records || response.data.records.length === 0) {
        throw new Error("No se encontraron registros con estas credenciales");
      }

      return response.data;
    } catch (error) {
      console.error("Error al enviar credenciales:", error);
      throw error;
    }
  }

  // Buscar registro solo por email
  async findByEmail(email: string) {
    try {
      const whereClause = `(email,eq,${email})`;
      const response = await this.client.get(
        `/api/v3/data/${this.baseId}/${this.tableId}/records`,
        {
          params: {
            where: whereClause
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error finding record by email ${email}:`, error);
      throw error;
    }
  }

  // Obtener todos los registros de una tabla
  async getTableData(tableName: string, params?: any) {
    try {
      const response = await this.client.get(
        `/api/v2/tables/${this.baseId}/${tableName}/records`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
    }
  }

  // Obtener un registro específico por ID
  async getRecordById(tableName: string, recordId: string) {
    try {
      const response = await this.client.get(
        `/api/v2/tables/${this.baseId}/${tableName}/records/${recordId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching record ${recordId} from ${tableName}:`, error);
      throw error;
    }
  }

  // Crear un nuevo registro
  async createRecord(tableName: string, data: any) {
    try {
      const response = await this.client.post(
        `/api/v2/tables/${this.baseId}/${tableName}/records`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw error;
    }
  }

  // Actualizar un registro
  async updateRecord(tableName: string, recordId: string, data: any) {
    try {
      const response = await this.client.patch(
        `/api/v2/tables/${this.baseId}/${tableName}/records/${recordId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating record ${recordId} in ${tableName}:`, error);
      throw error;
    }
  }

  // Eliminar un registro
  async deleteRecord(tableName: string, recordId: string) {
    try {
      const response = await this.client.delete(
        `/api/v2/tables/${this.baseId}/${tableName}/records/${recordId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting record ${recordId} from ${tableName}:`, error);
      throw error;
    }
  }

  // Obtener información de una tabla
  async getTableInfo(tableName: string) {
    try {
      const response = await this.client.get(
        `/api/v2/tables/${this.baseId}/${tableName}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching table info for ${tableName}:`, error);
      throw error;
    }
  }

  // Obtener todas las tablas de la base
  async getAllTables() {
    try {
      const response = await this.client.get(
        `/api/v2/tables/${this.baseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tables:", error);
      throw error;
    }
  }

  // Método genérico para peticiones personalizadas
  async request(config: AxiosRequestConfig) {
    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }
}

// Exportar una instancia única del servicio
export const apiService = new ApiService();
export default apiService;
