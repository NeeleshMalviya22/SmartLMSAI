using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartLMSAI.Application.Interfaces.IServices
{
    public interface IAiService
    {
        Task<string> AskAsync(string question, List<string> context);
    }
}
