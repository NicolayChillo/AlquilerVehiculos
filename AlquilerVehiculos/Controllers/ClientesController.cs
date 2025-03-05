using capaDatos;
using capaEntidad;
using capaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AlquilerVehiculos.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<ClientesCLS> listarClientes()
        {
            ClientesDAL obj = new ClientesDAL();
            return obj.listarClientes();
        }
        public int GuardarCliente(ClientesCLS cliente)
        {
            ClientesBL obj = new ClientesBL();
            return obj.GuardarCliente(cliente);
        }
        public ClientesCLS RecuperarCliente(int idCliente)
        {
            ClientesBL obj = new ClientesBL();

            ClientesCLS cliente = obj.RecuperarCliente(idCliente);
            return cliente;
        }
    }
}
